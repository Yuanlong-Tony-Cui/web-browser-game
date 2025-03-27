import "./Chessboard.css";
import { useEffect, useState } from "react";

export default function App() {

	const m = 8;
	const n = 8;

	// chessBoard is a 2D array
	const [chessBoard, setChessBoard] = useState([]);

	useEffect(() => {
		const result = [];
		for (let i = 0; i < m; i++) {
			result.push(new Array(n).fill(null));
		}
		setChessBoard(result);
	}, []);

	return (
		<div>
			{chessBoard.length > 0 &&
				chessBoard.map((row, rowIndex) => {
					return (
						<div className="row" key={rowIndex}>
							{row.map((_, colIndex) => {
								return (
									<div
										className={`box ${(rowIndex + colIndex) % 2 === 0 ? "black" : "white"}`}
										key={colIndex}
									></div>
								);
							})}
						</div>
					);
				})}
		</div>
	);
}
