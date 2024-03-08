"use client";
import { useState, FC } from "react";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    // Define the request body if necessary. For example:
    const requestBody = {
      key: "value", // Replace with actual key-value pairs expected by your API
    };
    console.log("calling the api");
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include other headers if needed
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        // Ensure the response is OK before attempting to parse JSON
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
        // Handle the error state appropriately
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <button onClick={handleClick}>Generate Sample Code</button>;
  // The button is now clickable and will trigger the fetch when clicked.

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Profile;
