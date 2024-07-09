class HomeController < ActionController::Base
    before_action :set_post, only: %i[ show edit update destroy ]

    # other controller actions (index, show, new, edit, create, update, destroy)
  
    private
  
    def set_post
      @post = Post.find(params[:id])
    end
end
