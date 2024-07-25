Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      # origins 'http://localhost:5173'  # Replace with the URL of your React app
      origins 'http://localhost:5173', 'https://crybaby-uiux-tkzaqm6e7a-as.a.run.app'
      
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end
  end
  