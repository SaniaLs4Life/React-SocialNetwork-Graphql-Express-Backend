import React, { useState } from "react";
import { Accordion, Icon, Container } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PAGES = gql`
  query {
    pages {
      id
      title
      meta_tags
      created_at
      portal {
        name
        address
      }
    }
  }
`;

const Pages = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading, error } = useQuery(GET_PAGES);
  if (loading) return <Container>Loading...</Container>;
  if (error) return `Error! ${error.message}`;
  return (
    <Container>
      <Accordion styled style={{ margin: "auto" }}>
        {data.pages &&
          data.pages.map((item, i) => (
            <React.Fragment key={i}>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={() => setActiveIndex(i)}
              >
                <Icon name="dropdown" />
                {item.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <p>Page Id: {item.id}</p>
                <p>Meta Tags: {item.meta_tags}</p>
                <p>{item.name}</p>
                <p>Created At: {item.created_at}</p>
              </Accordion.Content>
            </React.Fragment>
          ))}
      </Accordion>
    </Container>
  );
};

export default Pages;
