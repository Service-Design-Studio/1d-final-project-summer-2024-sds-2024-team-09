class MoviesController < ApplicationController
  def show
    id = params[:id] # retrieve movie ID from URI route
    @movie = Movie.find(id) # look up movie by unique ID
    # will render app/views/movies/show.<extension> by default
  end

  def index
    @all_ratings = Movie.all_ratings

    # case 1:if no params passed
    # i use the session parameters
    if params[:ratings].nil?&&params[:sort_by].nil?
      if session[:ratings] || session[:sort_by]
        flash.keep
        redirect_to movies_path(ratings: session[:ratings], sort_by: session[:sort_by])
        return
      else
        @ratings_to_show = @all_ratings
      end
    #case 2: if i did pass in parameters
    else
      session[:ratings] = params[:ratings]
      session[:sort_by] = params[:sort_by]
    end

    if params[:ratings].is_a?(Hash)
      @ratings_to_show = params[:ratings].keys
    elsif params[:ratings].is_a?(Array)
      @ratings_to_show=params[:ratings]
    else 
      @ratings_to_show = @all_ratings
    end 
    @movies = Movie.with_ratings(@ratings_to_show)
    @ratings_to_show_hash = Hash[@ratings_to_show.collect{|item| [item,1]}]

    if params[:sort_by] == 'title'
      @movies = @movies.order(:title)
      @title_header = 'hilite bg-warning'
    elsif params[:sort_by] == 'release_date'
      @movies = @movies.order(:release_date)
      @release_date_header = 'hilite bg-warning'
    end
  end

  def new
    # default: render 'new' template
  end

  def create
    @movie = Movie.create!(movie_params)
    flash[:notice] = "#{@movie.title} was successfully created."
    redirect_to movies_path
  end

  def edit
    @movie = Movie.find params[:id]
  end

  def update
    @movie = Movie.find params[:id]
    @movie.update_attributes!(movie_params)
    flash[:notice] = "#{@movie.title} was successfully updated."
    redirect_to movie_path(@movie)
  end

  def destroy
    @movie = Movie.find(params[:id])
    @movie.destroy
    flash[:notice] = "Movie '#{@movie.title}' deleted."
    redirect_to movies_path
  end

  private
  # Making "internal" methods private is not required, but is a common practice.
  # This helps make clear which methods respond to requests, and which ones do not.
  def movie_params
    params.require(:movie).permit(:title, :rating, :description, :release_date)
  end
end
