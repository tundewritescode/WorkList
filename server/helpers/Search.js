/**
 * @class Search
 */
class Search {
  /**
   * Searches for one occurrence of a given query
   *
   * @static
   * @param {Object} model - model to be searched
   * @param {Object} queryObject - term and field
   * @memberof Search
   *
   * @returns {Promise} - a promise containing the result
   */
  static async searchOne(model, queryObject) {
    return model.findOne(queryObject);
  }

  /**
   * Searches for all occurrences of a given query
   *
   * @static
   * @param {Object} model - model to be searched
   * @param {Object} queryObject - term and field
   * @memberof Search
   *
   * @returns {Promise} - a promise containing the result
   */
  static async searchAll(model, queryObject) {
    return model.find(queryObject);
  }

  /**
   * Search for one occurrence of a MongoDB ObjectId
   *
   * @static
   * @param {Object} model - model to be searched
   * @param {String} queryString - term to look for
   * @memberof Search
   *
   * @returns {Promise} - a promise containing the result
   */
  static async searchById(model, queryString) {
    return model.findById(queryString);
  }
}

export default Search;
