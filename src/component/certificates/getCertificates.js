import axiosInstance from "../security/requestInterceptor";

export default async function getCertificates(page, size) {
  const API_URL = `http://localhost:8080/application/v3/certificates?page=${page}&size=${size}`;
  const response = axiosInstance.get(API_URL).then((response) => response.data);
  return await response;
}
