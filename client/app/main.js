import { AuthController } from './Controllers/AuthController.js'
// import { AllPostsController } from './Controllers/AllPostsController.js'
import { PostsController } from './Controllers/PostsController.js'
import { CommentsController } from './Controllers/CommentsController.js'

class App {
  authController = new AuthController();

  // allPostsController = new AllPostsController();
  postsController = new PostsController();
  commentsController = new CommentsController();


}

// @ts-ignore
window.app = new App()
