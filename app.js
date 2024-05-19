async function youtubeApiCall(username) {
  const baseUrl = "https://youtube.googleapis.com/youtube/v3/";
  const channelParams = {
    part: ["contentDetails"],
    forUsername: username,
    key: "AIzaSyDBlgBgH_jNBrE_Z0IoZ19elB5z7VECdMo",
  };

  const channelUrl = `${baseUrl}channels?${new URLSearchParams(channelParams).toString()}`;
  console.log(channelUrl);

  const channelRespsonse = await fetch(channelUrl);
  if (!channelRespsonse.ok) {
    throw new Error(`Http error. Status: ${channelRespsonse.status}`);
  }
  const channelData = await channelRespsonse.json();
  const uploadPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

  if (!uploadPlaylistId) {
    throw new Error("Uploads playlist not found for this channel");
  }
  const playlistParams = {
    part: ["contentDetails"],
    playlistId: uploadPlaylistId,
    key: "AIzaSyDBlgBgH_jNBrE_Z0IoZ19elB5z7VECdMo",
  };
  const playlistUrl = `${baseUrl}playlistItems?${new URLSearchParams(playlistParams).toString()}`;
  const playlistResponse = await fetch(playlistUrl);
  if (!playlistResponse.ok) {
    throw new Error(`Http error. Status: ${playlistResponse.status}`);
  }

  const uploadsPlaylistData = await playlistResponse.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("usernameForm");
  form.addEventListener("submit", async (event) => {
    console.log("form submitted");
    const username = form.elements.channelUsername.value;
    console.log(username);
    try {
      await youtubeApiCall(username);
    } catch (error) {
      console.error("Error in api call", error);
    }
  });
});
