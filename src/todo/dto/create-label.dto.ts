import { ApiProperty } from "@nestjs/swagger";

export default class CreateLabelDto {
    @ApiProperty({ type: String })
    readonly name: string;
}