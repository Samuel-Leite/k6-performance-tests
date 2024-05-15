import http from "k6/http";
import { check, sleep } from "k6";

// configuracao -> é possivel adicionar mais de 1 configuracao
export const options = {
  vus: 100,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate < 0.01"],
    http_req_duration: ["p(95) < 250"],
  },
};

const BASE_URL = "https://test-api.k6.io";

// configuracao
export function setup() {
  const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: "0.024315838913832464@email.com",
    password: "user1234",
  });

  const token = loginRes.json("access"); // obtem os dados do token
  return token; // permite que o token seja acessivel em outra função
}

// execucao
export default function (token) {
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const res = http.get(`${BASE_URL}/my/crocodiles`, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
