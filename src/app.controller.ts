import { Body, Controller, Get, Query, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { createPostAPI, getPostsAPI, getPostsByUserId } from './apis/post';
import { createDiscussionAPI, getDiscussionAPI, getDiscussionForPostAPI } from './apis/discussion';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect(process.env.REDIRECT_URL)
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }

  @Get('userinfo')
  userinfo(@Req() req) {
    return req.session.user;
  }

  @Post('posts')
  async createPost(@Req() req, @Body() data) {
    return createPostAPI({ ...data, userId: req.session.user.id });
  }

  @Get('posts')
  async getPosts(@Query('userId') userId: string) {
    if (userId) {
      return getPostsByUserId(userId);
    }
    return getPostsAPI();
  }

  @Get('discussions')
  async getDiscussions() {
    return getDiscussionAPI();
  }

  @Post('discussions')
  async createDiscussion(@Req() req, @Body() data) {
    return createDiscussionAPI({ ...data, userId: req.session.user.id });
  }

  @Get('discussions/post/:id')
  async getDiscussion(@Req() req) {
    return getDiscussionForPostAPI(req.params.id);
  }
}
