import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from "./utils/appStore";

function App() {
	return (
		<div className="app w-screen h-screen">
			<Provider store={appStore}>
				<PersistGate loading={null} persistor={persistor}>
					<Body />
				</PersistGate>
			</Provider>
		</div>
	);
}

export default App;
