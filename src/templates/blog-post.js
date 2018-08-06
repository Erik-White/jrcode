import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';
import { Main, Container, Title, Opener, Subtitle, Meta, List, ListItem } from '../styled-components';
import Image from '../components/Image';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  images
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Main>
      {helmet || ''}
      <Container>
        <Title>
            {title}
        </Title>
        <Opener>{description}</Opener>
        <PostContent content={content} />
        <Image images={images}/>
        {tags && tags.length ? (
            <Meta>
            <Subtitle>Tags</Subtitle>
            <List>
                {tags.map(tag => (
                <ListItem key={tag}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </ListItem>
                ))}
            </List>
            </Meta>
        ) : null}
      </Container>
    </Main>
  );
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = (props) => {
    console.log(props);
  const { markdownRemark: post, allFile : {edges}} = props.data;
  const linkedImage = edges.find(edge => edge.node.childImageSharp.sizes.originalImg.includes(post.frontmatter.imageLocation));
  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      images={linkedImage.node.childImageSharp.sizes}
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        imageLocation
      }
    }
    allFile(filter : {extension : {eq : "png"}}) {
        edges {
            node {
                childImageSharp {
                    sizes(maxWidth: 1240 ) {
                        tracedSVG,
                        originalImg
                    }
                }
            }
        }
    }
  }
`