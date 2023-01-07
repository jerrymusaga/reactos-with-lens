import React from "react";
import { Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/card';
import { Avatar, Flex, Box, Heading, Text,IconButton,Image,Button } from '@chakra-ui/react'
// import {BsThreeDotsVertical,BiLike,BiChat,BiShare } from "chakra-ui/icons"


const Feed = ({posts,follow,parseImageUrl}) => {
    console.log(posts)
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
                        <Heading size='sm'>{post.profile?.handle}</Heading>
                        <Text>{post.profile.name}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        // icon={<BsThreeDotsVertical />}
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
                    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
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