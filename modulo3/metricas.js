import http from "k6/http";
import { check } from "k6";
import { Counter, Gauge, Rate, Trend  } from "k6/metrics";

export const options = {
  vus: 1,
  duration: "3s",
};

const chamadas = new Counter('quantidade_chamadas');
const myGauge = new Gauge('tempo_bloqueado')
const myRate = new Rate('taxa_req_200')
const myTrend = new Trend('taxa_espera');

export default function () {
  const req = http.get('http://test.k6.io/');

    //contador
    chamadas.add(1);
    //medidor
    myGauge.add(req.timings.blocked);
    //taxa
    myRate.add(req.status === 200);
    //tendencia
    myTrend.add(req.timings.waiting);

    // Validar status, mensagem etc
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
