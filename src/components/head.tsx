import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

type HeadProps = {
  title: string;
  description: string;
  path: string;
};

const Head: FunctionComponent<HeadProps> = ({ title, description, path }) => (
  <Helmet>
    <title>{title} - rileyflynn.me</title>
    <meta name="description" content={description} />
    <meta name="image" content={`screenshots/${title}.png`} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={"https://archives.rileyflynn.me/2019" + path + "/"} />
    <meta property="og:title" content={title + " - rileyflynn.me"} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={`https://archives.rileyflynn.me/2019/screenshots/${title}.png`}
    />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@BootlegJohn" />
    <meta name="twitter:title" content={title + " - rileyflynn.me"} />
    <meta name="twitter:description" content={description} />
    <meta
      name="twitter:image"
      content={`https://archives.rileyflynn.me/2019/screenshots/${title}.png`}
    />
  </Helmet>
);

export default Head;
