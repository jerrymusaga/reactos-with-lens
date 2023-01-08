import React from "react";
import { Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/card';
import { Avatar, Flex, Box, Heading, Text,IconButton,Image,Button } from '@chakra-ui/react'
import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/alert";
import { Link } from "react-router-dom";


const Feed = ({posts,follow,parseImageUrl, connectWallet}) => {
    
    return (
        <>
        {
            posts.map((post) => (
                <Card 
                    key={post.id}
                    maxW='md'
                    
                >
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar 
                            name={post.profile?.handle} 
                            src={parseImageUrl(post.profile)}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/default-avatar.png";
                              }}
                        />

                        <Box>
                        <Heading size='sm'>
                            <Link to={post.profile?.handle}>{post.profile?.handle}</Link>
                            
                        </Heading>
                        <Text>{post.profile.name}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                    />
                    <Image
                        alt="follow-icon"
                        src="/follow-icon.png"
                        width="50px"
                        height="50px"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => follow(post.id)}
                      />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                    {post.metadata?.content}
                    </Text>
                </CardBody>
                <Image
                    objectFit='cover'
                    src={parseImageUrl(post.profile.picture)}
                    alt='Chakra UI'
                />

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                    '& > button': {
                        minW: '136px',
                    },
                    }}
                >
                    <Button flex='1' variant='ghost' >
                    Like
                    </Button>
                    <Button flex='1' variant='ghost' >
                    Comment
                    </Button>
                    <Button flex='1' variant='ghost' >
                    Share
                    </Button>
                </CardFooter>
            </Card>
            ))
        }
        </>
    )
}

export default Feed;