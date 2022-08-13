import { ProxyState } from "../AppState.js"
export class Post {
    constructor(data) {
        this.img = data.img
        this.title = data.title
        this.id = data.id
        this.upvote = data.upvote
        this.downvote = data.downvote
    }


    get CardTemplate() {
        return `
        <div class="pt-5 col-md-3" onclick="app.allPostsController.setSinglePost('${this.id}')">
            <img class="img-fluid p-img" src="${this.img}" alt="" data-bs-toggle="modal" data-bs-target="#details-modal">
            
        </div>
        `
    }

    get ModalTemplate() {
        return `
        <div class="row modal-body">
        <div class="col-md-6">
            <div>
                <img class="img-fluid post-img"
                    src="${this.img}"
                    alt="">
            </div>
        </div>
        <div class="col-6">
            <div class="mx-3">
                <div>
                    <p class="fw-2">${this.title} <i
                    class="btn mdi mdi-delete fs-5" onclick="app.commentsController.deleteComment('${this.id}')"></i></p>
                </div>
                <div id="comments">
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 border border-top">
        <div class="row justify-content-between p-3">

            <div class="col-3">
                <h4 class="text-center">10 🔥</h4>
            </div>
            <div class="col-3">
                <h4 class="text-center">2 🥶</h4>
            </div>

            <div class="col-6">
                <form onsubmit="app.commentsController.createComment('${this.id}')" class="ps-4">
                    <div class="input-group">
                        <input id="message" type="text" class="form-control" placeholder="Enter Comment"
                            aria-label="post's comments" aria-describedby="button-addon2" minlength="2"
                            maxlength="50">
                        <button class="btn btn-primary" type="submit" id="button-addon2">Post</button>
                    </div>
                </form>
            </div>

        </div>
    </div>

        `
    }
}