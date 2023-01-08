import { createClient } from "urql";

export const APIURL = "https://api.lens.dev";
export const LENS_HUB_CONTRACT_ADDRESS =
  "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

export const urlClient = createClient({
  url: APIURL,
});

export const queryRecommendedProfiles = `
query RecommendedProfiles {
  recommendedProfiles {
        id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
        followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
  }
}
`;

export const queryExplorePublications = `
query ExplorePublications {
  explorePublications(request: {
    sortCriteria: TOP_COMMENTED,
    publicationTypes: [POST, COMMENT, MIRROR],
    limit: 10
  }) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
       ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ...FollowModuleFields
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
    small {
      ...MediaFields
    }
    medium {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  hasCollectedByMe
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
    type
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}


`;

export const queryGetProfile =  `
{
  "data": {
    "profile": {
      "id": "0x01",
      "name": "LensProtocol.eth 🌿",
      "bio": "A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.",
      "attributes": [
        {
          "displayType": null,
          "traitType": "string",
          "key": "location",
          "value": "Developer Garden"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "website",
          "value": "https://lens.dev/"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "twitter",
          "value": "lensprotocol"
        },
        {
          "displayType": null,
          "traitType": "boolean",
          "key": "isBeta",
          "value": "true"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "app",
          "value": "Lenster"
        }
      ],
      "followNftAddress": "0x5832bE646A8a7A1A7a7843efD6B8165aC06e360D",
      "metadata": "ipfs://QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
      "isDefault": false,
      "picture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "handle": "lensprotocol.test",
      "coverPicture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "ownedBy": "0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5",
      "dispatcher": null,
      "stats": {
        "totalFollowers": 2103,
        "totalFollowing": 0,
        "totalPosts": 2,
        "totalComments": 0,
        "totalMirrors": 0,
        "totalPublications": 2,
        "totalCollects": 1354
      },
      "followModule": null
    }
  }
}
`
