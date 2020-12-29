import React from "react";
import { EuiHeader, EuiHeaderSectionItem, EuiHeaderLogo, EuiHeaderLinks, EuiHeaderLink } from "@elastic/eui";

export default () => {
  return (
    <EuiHeader theme="dark">
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo>Restauraunt Finder</EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          <EuiHeaderLink>About</EuiHeaderLink>

          <EuiHeaderLink>Code</EuiHeaderLink>

          <EuiHeaderLink iconType="help">Help</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
