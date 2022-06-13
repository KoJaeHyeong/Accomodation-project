import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guard';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileservice: FileService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[], // 파일정보나 업로드를 하기가 힘듬(graphql 단점)
  ) {
    return this.fileservice.upload({ files });
  }
}
