const clientID = "cxfEBYtywoPwbNS0RmkunuvdhxR0qxF1wtFTdWDj1Bc";

export async function getImages(pageNumber = "1", searchTerm = "cat") {
  const req = fetch(
    `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchTerm}&client_id=${clientID}`
  );
  const res = await req;
  return res.json();
}
