import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export default class CreateTaskDto {
    @ApiProperty({ type: String })
    readonly description: string;

    @ApiProperty({ type: Number })
    readonly categoryID: number;

    @Optional()
    @ApiPropertyOptional({ type: Array(Number) })
    readonly labelIDs: number[];

    @Optional()
    @ApiPropertyOptional({ type: Array(Number) })
    readonly itemIDs: number[];
}