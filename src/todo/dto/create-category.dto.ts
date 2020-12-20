import { ApiProperty } from "@nestjs/swagger";

export default class CreateCategoryDto {
    @ApiProperty({ type: String })
    readonly name: string;
}