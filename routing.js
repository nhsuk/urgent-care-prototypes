// Automatically route files
// Try to match a request to a template, for example a request for /test
// would look for /app/views/test.html and /app/views/test/index.html
// With thanks to GDS (Government Digital Service) for the code snippet https://github.com/alphagov/govuk-prototype-kit

function renderPath (path, res, next) {
    // Try to render the path
    res.render(path, function (error, html) {
      if (!error) {
        // Success - send the response
        res.set({ 'Content-type': 'text/html; charset=utf-8' })
        res.end(html)
        return
      }
      if (!error.message.startsWith('template not found')) {
        // We got an error other than template not found - call next with the error
        next(error)
        return
      }
      if (!path.endsWith('/index')) {
        // Maybe it's a folder - try to render [path]/index.html
        renderPath(path + '/index', res, next)
        return
      }
      // We got template not found both times - call next to trigger the 404 page
      next()
    })
  }
  
  exports.matchRoutes = function (req, res, next) {
    var path = req.path
  
    // Remove the first slash, render won't work with it
    path = path.substr(1)
  
    // If it's blank, render the root index
    if (path === '') {
      path = 'index'
    }
    switch(path) {
      case "walk-in-centre-finder":
        path = "finder/walk-in-finder";
        break;
      case "ae-finder":
       path = "finder/ae-finder";
        break;
        case "google/search-ae":
        path = "google/ae-search";
        break;
        case "google/search-wi":
        path = "google/walk-in-search";
        break;
      case "uti-carecard-111":
       path = "conditions/uti-carecard-111";
        break;
        case "uti-carecard-expander":
        path = "conditions/uti-carecard-expander";
         break;
         case "hand-pain-111":
       path = "conditions/hand-pain-111";
        break;
        case "hand-pain-expander":
        path = "conditions/hand-pain-expander";
         break;
    
    }
    renderPath(path, res, next)
  }
  