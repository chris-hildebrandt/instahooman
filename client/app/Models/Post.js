
export class Post{
    constructor(data){
        this.img = data.img 
        this.caption = data.caption
        this.id = data.id
        this.upvote = data.upvote
        this.downvote = data.downvote
    }

    get Template() {
        return `
        //modale
            <div class="modal-dialog modal-size">
                <div class="modal-content">

                    <div class="row modal-body">
                        <div class="col-6">
                            <div>
                                <img class="img-fluid post-img"
                                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                                    alt="">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mx-3">
                                <div>
                                    <p class="fw-2">${this.caption}</p>
                                </div>
                                <div>

                                // <-- SECTION Comments go here -->
                                    <p></p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 border border-top">
                        <div class="row justify-content-between p-3">

                            <div class="col-3">
                                <h4 class="text-center">🔥</h4>
                            </div>
                            <div class="col-3">
                                <h4 class="text-center">🥶</h4>
                            </div>

                            <div class="col-6">
                                <form class="ps-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Enter Comment"
                                            aria-label="post's comments" aria-describedby="button-addon2" minlength="2"
                                            maxlength="50">
                                        <button class="btn btn-primary" type="button" id="button-addon2">Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}