// 1. inicialização
import sleep from 'k6';

// 2 . configuracao
export const options = {
    vus: 1,
    duration: '10s',
}

// 3. execução / codigo VU
export default function () {
    console.log("Testando K6")
    sleep(1);
}

// 4. desmontagem
export function teardown(data) {
    console.log(data)
};