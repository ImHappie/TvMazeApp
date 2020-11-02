export const Search =({search,getMedia,placeholder,input}) => {
    return (
        <div className="search-area p-5">
        <form onSubmit={search}>
          <div className="form-group input-group has-search col-sm-8 m-auto">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" name="show" value={input} placeholder={placeholder} autoComplete="off" onChange={getMedia}/>
            <div className="ml-3">
              <button className="btn btn-primary search-button" type="submit" onClick={search}>Search</button>
            </div>
          </div>
        </form>
      </div>
    )
}