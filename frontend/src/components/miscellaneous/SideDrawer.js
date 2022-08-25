import React, { useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { Button, Tooltip } from "@chakra-ui/react";

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return <>
    <Box>
      <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
        <Button varient="ghost">
          <i class="fas fa-search"></i>
        </Button>
      </Tooltip>
    </Box>

  </>
}

export default SideDrawer