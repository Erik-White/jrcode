import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, sample } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';
import Image from '../components/Image';
import { Main, Container, BulletedTitle, Opener, Subtitle, Meta, List, LinkedListItem, Centraliser, Option } from '../styled-components';
import {colours} from '../style';

export const BlogPostTemplate = ({
    content,
    contentComponent,
    description,
    tags,
    title,
    images,
    caption,
    siteTitle
}) => {
    const PostContent = contentComponent || Content;
    const sampleColour = sample(colours);

    tags.sort((a, b) => {
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    })

    return (
        <Main
            colour={sampleColour}
        >
            <Helmet title={`${siteTitle} - blog - ${title}`} />
            <Container>
                <BulletedTitle
                    addition="title"
                    componentContent={title}
                    colour={sampleColour}
                />
                <Opener>{description}</Opener>
                <PostContent content={content} />
                {images && <Centraliser>
                    <Image images={images} caption={caption} sampleColour={sampleColour}/>
                </Centraliser>}
                {tags && tags.length && (
                    <Meta
                        colour={sampleColour}
                    >
                        <Subtitle>Tags</Subtitle>
                        <List>
                            {tags.map(tag => (
                            <LinkedListItem
                                key={tag}
                                colour={sampleColour}
                                linkTo={`/tags/${kebabCase(tag)}/`}
                            >
                                <Option>{tag}</Option>
                            </LinkedListItem>
                            ))}
                        </List>
                    </Meta>
                )}
            </Container>
        </Main>
    );
}

BlogPostTemplate.propTypes = {
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    helmet: PropTypes.object,
}

const BlogPost = ({data}) => {
    const { markdownRemark: post, allFile : {edges}} = data;
    const linkedImage = edges.find(edge => edge.node.childImageSharp.sizes.originalImg.includes(kebabCase(post.frontmatter.title)));
    return (
        <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        siteTitle={data.site.siteMetadata.title}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        caption={post.frontmatter.caption}
        images={linkedImage ? linkedImage.node.childImageSharp : null}
        />
    )
}

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    })
}

export default BlogPost;

export const pageQuery = graphql`
    query ImagePageAndBlogPostByID($id: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
                caption
            }
        }
        allFile(filter : {extension : {eq : "png"}}) {
            edges {
                node {
                    childImageSharp {
                        sizes {
                            originalImg
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`