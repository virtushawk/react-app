export default async function getCertificates(page, size) {
  const API_URL = `http://localhost:8080/application/v3/certificates?page=${page}&size=${size}`;
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  }
  return await response.json();
}
