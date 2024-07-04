class PagesController < ActionController::Base
  def run_makefile
    # Run the Makefile target
    make_command = "cd #{Rails.root.join('python_scripts')} && poetry install && make run"
    result = system(make_command)

    # Check the result and set the flash message accordingly
    if result
      flash[:notice] = 'Makefile executed successfully.'
    else
      flash[:alert] = 'Failed to execute Makefile.'
    end

    # Redirect to the desired page (home page or index page in this case)
    redirect_to root_path
  end
end
