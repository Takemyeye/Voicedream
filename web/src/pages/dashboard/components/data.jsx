import React, { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UsersList } from "./userList";
import { StoriesList } from "./storiesList";
import { UserStoriesList } from "./userstoryList";
import { VoicesList } from "./voiceList";

const Datas = () => {
  const [token] = useState(Cookies.get("token"));
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [voices, setVoices] = useState([]);
  const [userStory, setUserStory] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://cp.voicedream.space/api/dashboard", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      console.log("data:", data);

      if (data) {
        setUsers(data.users);
        setVoices(data.voices);
        setStories(data.stories);
        setUserStory(data.usersStories);
      }
      
    } catch (err) {
      console.error("error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="dashboard">
        <UsersList users={users}/>
        <StoriesList stories={stories} />
        <UserStoriesList userStories={userStory}/>
        <VoicesList voices={voices} />
    </div>
  );
};

export default Datas;
