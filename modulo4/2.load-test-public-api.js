import http from "k6/http";
import { check, sleep } from "k6";
import {SharedArray} from 'k6/data'

// configuracao
export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    checks: ["rate > 0.95"],
    http_req_duration: ["p(95) < 2000"],
  },
};

// configuracao
// acesso ao arquivo json para uso randomico sem usar apenas um único ID
const data = new SharedArray('Leitura do Json', function(){
  return JSON.parse(open('./2.dados.json')).crocodilos
})

// execucao
export default function () {
  const crocodilo = data[Math.floor(Math.random() * data.length)].id //obter os dados do arquivo .json de forma randomica
  console.log(crocodilo)

  const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;

  const res = http.get(BASE_URL);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1)
}
