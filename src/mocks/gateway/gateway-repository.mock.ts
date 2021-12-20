import {gatewaysMockData} from "./gateway-data.mock";
import {GatewayDTO} from "../../dto/gateway.dto";


export class GatewayRepositoryMock {

    find() {
        return gatewaysMockData;
    }

    findById(id: string) {
        return gatewaysMockData.find((g) => {
            return g._id == id;
        });

    }

    create(gatewayDTO: GatewayDTO) {

        const founded = gatewaysMockData.find((g, index) => {
            return g.serialNumber == gatewayDTO.serialNumber && index != 0;
        })
        if (founded) {
            return null;
        }
        if (!gatewayDTO.serialNumber || !gatewayDTO.address || !gatewayDTO.name) {
            return null
        }
        return gatewaysMockData[0];
    }

    findByIdAndUpdate(id: string, gatewayDTO: GatewayDTO) {
        const founded = gatewaysMockData.find((g) => {
            return g._id != id && g.serialNumber == gatewayDTO.serialNumber;
        })
        if (founded) {
            return null
        } else {
            return {...gatewaysMockData[0], ...gatewayDTO};
        }
    }

    findByIdAndDelete(id: string) {
        const device = gatewaysMockData[0];
        if (device._id == id) {
            return device;
        }
        return null;
    }
}