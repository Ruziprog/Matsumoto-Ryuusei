package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

type Character struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Age    int    `json:"age"`
	Gender string `json:"gender"`
	Title  string `json:"title"`
	Status string `json:"status"`
	Power  string `json:"power"`
}

var characters = []Character{
	{ID: 1, Name: "Freia Noctis", Age: 10, Gender: "Female", Title: "Princess", Status: "Alive", Power: "Claws"},
	{ID: 2, Name: "Rudzi Serenus", Age: 20, Gender: "Male", Title: "Sensei", Status: "Alive", Power: "Absolutum Luminis"},
	{ID: 3, Name: "Mortis Gladius", Age: 35, Gender: "Male", Title: "Freia's Opponent", Status: "Dead", Power: "Eidolon Evolution"},
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func getAllCharacters(w http.ResponseWriter, r *http.Request) {
    writeJSON(w, http.StatusOK, characters)
}

func getCharacterByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	for _, char := range characters {
		if char.ID == id {
			writeJSON(w, http.StatusOK, char)
			return
		}
	}

	writeJSON(w, http.StatusNotFound, map[string]string{"error": "Character not found"})
}

func freiaVsMortisHandler(w http.ResponseWriter, r *http.Request) {
    freia := characters[0]
    mortis := characters[2]

    eidolonActivated := rand.Intn(100) < 30

    var winner, loser Character
    var result string

    if eidolonActivated {
        winner = freia
        loser = mortis
        result = "VICTORY! Eidolon Evolution was activated!"
    } else {
        winner = mortis
        loser = freia
        result = "DEFEAT! Eidolon Evolution wasn't activated"
    }

    response := map[string]interface{}{
        "battle": "Freia Noctis VS Mortis Gladius",
        "winner": winner.Name,
        "loser":  loser.Name,
        "result": result,
        "conditions": map[string]bool{
            "eidolon_activated": eidolonActivated,
            "age_advantage":     freia.Age < mortis.Age,
            "power_match":       strings.Contains(freia.Power, "Eidolon Evolution") || strings.Contains(mortis.Power, "Eidolon"),
        },
        "stats": map[string]interface{}{
            "freia": map[string]interface{}{
                "age":    freia.Age,
                "power":  freia.Power,
                "status": freia.Status,
            },
            "mortis": map[string]interface{}{
                "age":    mortis.Age,
                "power":  mortis.Power,
                "status": mortis.Status,
            },
        },
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}


func main() {
	rand.Seed(time.Now().UnixNano())
	
	r := mux.NewRouter()
	r.HandleFunc("/api/characters", getAllCharacters).Methods("GET")
	r.HandleFunc("/api/characters/{id:[0-9]+}", getCharacterByID).Methods("GET")
	r.HandleFunc("/battle/freia-vs-mortis", freiaVsMortisHandler).Methods("GET")

	fmt.Println("🚀 Character API запущен!")
	http.ListenAndServe(":8080", r)
}