package main

import (
    "encoding/json"
    "net/http"
    "strconv"
	"fmt"
	"github.com/gorilla/mux"
)

type Anime struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Author string `json:"author"`
}

var animes = []Anime{
	{
		ID: 1,
		Title: "Kimetsu no Yaiba",
		Author: "Koyoharu Gotoge",
	},

	{
		ID: 2,
		Title: "Jujutsu Kaisen",
		Author: "Akutami Gege",
	},

	{
		ID: 3,
		Title: "Sousou no Frieren",
		Author: "Kanehito Yamada",
	},
}

func getAllAnime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"version": "1.0",
		"animes": animes,
		"count": len(animes),
	})
}

func getAnimeByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])

	if err != nil {
		http.Error(w, `{"error": "Invalid ID"}`, http.StatusBadRequest)
		return
	}

	for _, anime := range animes {
		if anime.ID == id {
			w.Header().Set("Content-Type", "application/json")
	        json.NewEncoder(w).Encode(anime)
			return
		}
	}

	http.Error(w, `{"error": "Not Found"}`, 404)
}

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/api/animes", getAllAnime).Methods("GET")
    r.HandleFunc("/api/animes/{id:[0-9]+}", getAnimeByID).Methods("GET")


    fmt.Println("🚀  API запущен!")
    fmt.Println("👉 http://localhost:8080/api/animes")
	fmt.Println("👉 http://localhost:8080/api/animes/1")
	fmt.Println("👉 http://localhost:8080/api/animes/2")
	fmt.Println("👉 http://localhost:8080/api/animes/3")
	fmt.Println("❌ http://localhost:8080/api/animes/abc (404!)")

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "Anime API is running!")
	}).Methods("GET")

    http.ListenAndServe(":8080", r)
}