import { ApiProperty } from "@nestjs/swagger";

export default class CreateUserDto {
    @ApiProperty({ type: String })
    readonly name: string;

    @ApiProperty({ type: String })
    readonly username: string;

    @ApiProperty({ type: String })
    readonly password: string;

    @ApiProperty({ type: Array(Number) })
    readonly books: number[];
}