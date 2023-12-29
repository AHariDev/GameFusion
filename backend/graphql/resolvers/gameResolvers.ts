import { fetchGames, dashboardGames, fetchPlatforms, fetchGenres, fetchTags } from "../models/gamesModel.js";
import fetch from "node-fetch";
import key from "../../helpers/key.js";

interface GameDetails {
    name: String
    id: String
    background_image: String
    released: String
    ratings: Object
}

interface Details {
    id: String
    name: String
    slug: String
    image_background: String
    games_count: Number
    description: String
}

interface Listing{
    status: String 
    seller: String
    listed_at: String
    sold_at: String
}

interface GameMarket{
    numListings: Number
    listings: [Listing]
}

const gameResolvers = {
    Query : {
        getGames : async (_, args) => {
            let games = await fetchGames(args.searchParam);
            return games;
        }, 
        getMainGames : async () => {
            let mainGames = await dashboardGames(); 
            return mainGames; 
        }, 
        getPlatforms: async () => {
            let platforms = await fetchPlatforms(); 
            return platforms; 
        }, 
        getGenres: async () => {
            let genres = await fetchGenres(); 
            return genres; 
        }, 
        getTags: async () => {
            let tags = await fetchTags(); 
            return tags; 
        }, 
        getGameDetails: async (_, args) => {
            let details = await fetch(`https://api.rawg.io/api/games/${args.id}?key=${key}`);
            let data = await details.json() as GameDetails;
            return data; 
        },
        getGameMarket: async(_, args) => {

        },
        getPlatformDetails: async (_, args) => {
            let details = await fetch(`https://api.rawg.io/api/platforms/${args.id}?key=${key}`);
            let data = await details.json() as Details;
            return data; 
        }, 
        getTagDetails: async (_, args) => {
            let details = await fetch(`https://api.rawg.io/api/tags/${args.id}?key=${key}`);
            let data = await details.json() as Details;
            return data;
        }, 
        getGenreDetails: async (_, args) => {
            let details = await fetch(`https://api.rawg.io/api/genres/${args.id}?key=${key}`);
            let data = await details.json() as Details;
            return data;
        }, 
    }
 }; 

 export default gameResolvers; 