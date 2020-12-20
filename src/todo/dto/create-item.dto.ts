import { ApiProperty } from "@nestjs/swagger";

export default class CreateItemDto {
    @ApiProperty({ type: String })
    readonly name: string;

    @ApiProperty({ type: Number })
    readonly taskID: number;
}