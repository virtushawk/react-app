import axiosInstance from "../security/requestInterceptor";

export default async function getCertificates(page, size, searchValue) {
  const API_URL = `http://localhost:8080/application/v3/certificates?page=${page}&size=${size}&text=${searchValue}`;
  const response = axiosInstance.get(API_URL).then((response) => response.data);
  return await response;
}
