import http from "k6/http";
import { check, sleep } from "k6";

// configuracao
// carga 10 VU por 10s
// requisicao sucesso 95%
// requisicao falha < 1%
// duracao requisicao package(95) < 500
export const options = {
  stages: [{ duration: "10s", target: 10 }],
  thresholds: {
    checks: ["rate > 0.95"],
    http_req_failed: ["rate < 0.01"],
    http_req_duration: ["p(95) < 500"],
  },
};

// execucao
export default function () {
  const BASE_URL = "https://test-api.k6.io";
  const USER = `${Math.random()}@email.com`;
  const PASSWORD = "user1234";

  console.log(USER + PASSWORD);

  const res = http.post(`${BASE_URL}/user/register/`, {
    username: USER,
    first_name: "crocodilo dundee",
    last_name: "dino",
    email: USER,
    password: PASSWORD,
  });

  check(res, {
    "Sucesso ao registrar crocodilo": (r) => r.status === 201,
  });

  sleep(1);
}
