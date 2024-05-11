import { Module } from "@nestjs/common";
import { ChartService } from "./chart.service";

@Module({
    imports:[],
    providers:[ChartService],
    exports:[ChartService]
})
export class ChartModule{}