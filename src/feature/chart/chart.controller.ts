import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChartService } from "./chart.service";

@ApiTags("Charts")
@Controller('chart')
export class ChartController {
    constructor(readonly chartService: ChartService) { }

    
}