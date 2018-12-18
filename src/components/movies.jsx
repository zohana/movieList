import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./common/likeButton";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  handleDeleteMovie = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies: movies
    });
  };

  handleLikeButton = movie => {
    //console.log(movie);
    const movies = [...this.state.movies];
    //find the index of that object
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    //console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    console.log(this.state.movies);
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    console.log(movies);

    return (
      <div>
        <p className="h3">Movie List</p>
        <p>
          {this.state.movies.length >= 1
            ? this.state.movies.length + " movies in the list"
            : null}
        </p>
        <p>{this.state.movies.length === 0 && "No movies found"}</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <LikeButton
                    liked={movie.liked}
                    toggleLike={() => this.handleLikeButton(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDeleteMovie(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Movies;
