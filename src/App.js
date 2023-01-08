import { useEffect, useState } from "react";
import {
  urlClient,
  LENS_HUB_CONTRACT_ADDRESS,
  queryRecommendedProfiles,
  queryExplorePublications,
  queryGetProfile
} from "./queries";
import { useQuery } from "urql";
import LENSHUB from "./lenshub";
import { ethers } from "ethers";
import { Box, Button, Image } from "@chakra-ui/react";
import Landing from "./page/Landing";
import Feed from "./page/Feed";
import { Routes, Route, useRoutes } from 'react-router-dom';
import ProfilePage from "./page/ProfilePage";


function App() {
  const [account, setAccount] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  async function getProfile(id){
    // const {loading,error,data} = useQuery(queryGetProfile, {
    //   variables: {request: {profileId: id}},
    // })

    // if (loading) return "Loading..";
    // if (error) return `Error! ${error.message}`;

  }

  async function getRecommendedProfiles() {
    const response = await urlClient
      .query(queryRecommendedProfiles)
      .toPromise();
    const profiles = response.data.recommendedProfiles.slice(0, 10);
    setProfiles(profiles);
  }

  async function getPosts() {
    const response = await urlClient
      .query(queryExplorePublications)
      .toPromise();

    const posts = response.data.explorePublications.items.filter((post) => {
      if (post.profile) return post;
      return "";
    });
    setPosts(posts);
  }

  async function follow(id) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      provider.getSigner()
    );
    const tx = await contract.follow([parseInt(id)], [0x0]);
    await tx.wait();
  }

  useEffect(() => {
    getRecommendedProfiles();
    getPosts();
  }, []);

  const parseImageUrl = (profile) => {
    if (profile) {
      const url = profile.picture?.original?.url;
      if (url && url.startsWith("ipfs:")) {
        const ipfsHash = url.split("//")[1];
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      }

      return url;
    }

    return "/default-avatar.png";
  };




  return (
    <div className="app">
      {/* NAVBAR */}
      <Box width="100%" backgroundColor="rgba(5, 32, 64, 28)">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="55%"
          margin="auto"
          color="white"
          padding="10px 0"
        >
          <Box>
            <Box
              fontFamily="DM Serif Display"
              fontSize="44px"
              fontStyle="italic"
            >
              Reactos
            </Box>
            <Box> Social Platform on Lens Protocol</Box>
          </Box>
          {account ? (
            <Box backgroundColor="#000" padding="15px" borderRadius="6px">
              Connected
            </Box>
          ) : (
            <Button
              onClick={connectWallet}
              color="rgba(5,32,64)"
              _hover={{ backgroundColor: "#808080" }}
            >
              Connect Wallet
            </Button>
          )}
        </Box>
      </Box>
      

      {/* CONTENT */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="55%"
        margin="35px auto auto auto"
        color="white"
      >
        {/* POSTS */}
        <Box width="65%" maxWidth="65%" minWidth="65%">
        <Feed posts={posts} follow={follow} parseImageUrl={parseImageUrl} connectWallet={connectWallet} />
        </Box>

        {/* FRIEND SUGGESTIONS */}
        <Box
          width="30%"
          backgroundColor="rgba(5, 32, 64, 28)"
          padding="40px 25px"
          borderRadius="6px"
          height="fit-content"
        >
          <Box fontFamily="DM Serif Display">Recommended Profiles</Box>
          <Box>
            {profiles.map((profile, i) => (
              <Box
                key={profile.id}
                margin="30px 0"
                display="flex"
                alignItems="center"
                height="40px"
                _hover={{ color: "#808080", cursor: "pointer" }}
              >
                <img
                  alt="profile"
                  src={parseImageUrl(profile)}
                  width="40px"
                  height="40px"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/default-avatar.png";
                  }}
                />
                <Box marginLeft="25px">
                  <h4>{profile.name}</h4>
                  <p>{profile.handle}</p>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
