function paginate(model) {
  return  (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }

    results.results = model.slice(
      startIndex? startIndex : 0, 
      endIndex? endIndex : model.length
    );

    results.totalFound = model.length;
    
    return results;
  }
}

module.exports = paginate;