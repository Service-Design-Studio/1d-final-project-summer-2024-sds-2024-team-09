# app/controllers/pages_controller.rb
class PagesController < ApplicationController
    def index
      render file: 'public/index.html'
    end
  end
  