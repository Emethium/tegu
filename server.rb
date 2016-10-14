require 'sinatra'

get '/' do
  content_type 'html'
  erb :index
end
