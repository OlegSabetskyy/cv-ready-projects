import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.Semaphore;

import javax.net.ssl.SSLSocket;

import javafx.scene.control.TextArea;

public class TcpServerThreadRebre extends Thread{
	private SSLSocket clientSocket;
	private Semaphore enviarDades;
	private DadesCompartidaServidor dadesCompartides;
	private String nomClientActual = "";
	private TextArea textArea;
	
	public TcpServerThreadRebre(SSLSocket clientSocket, Semaphore enviarDades, DadesCompartidaServidor clientMessage, TextArea textArea) {
		this.clientSocket = clientSocket;
		this.enviarDades = enviarDades;
		this.dadesCompartides = clientMessage;
		this.textArea = textArea;
	}
	
	@Override
	public void run() {
		rebreNomUsuari();
		rebreMissatges();
	}
	
	//El servidor s'espera a rebre el nom d'usuari si el client s'acaba de conectar
	private void rebreNomUsuari() {
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(this.clientSocket.getInputStream()));
			this.nomClientActual = in.readLine();
			TcpServer.nomUsuaris.add(this.nomClientActual);
			TcpServer.nomUsuariRebut.set(TcpServer.clientsSocket.indexOf(this.clientSocket), true);
			
			this.dadesCompartides.setMissatge("En " + this.nomClientActual + " s'ha unit a la sessió");
			this.dadesCompartides.setNomClient("SERVIDOR");
			this.enviarDades.release();
			
		} catch (Exception e) {
		}
	}
	
	private void rebreMissatges() {
		boolean farewellMessage = false;
		String missatge = "";
		
		try {
			while(!farewellMessage && !dadesCompartides.getStopServidor()) {
				BufferedReader in = new BufferedReader(new InputStreamReader(this.clientSocket.getInputStream()));
				missatge = in.readLine();
				this.dadesCompartides.setMissatge(missatge);
				this.dadesCompartides.setNomClient(this.nomClientActual);
				farewellMessage = isFarewellMessage(this.dadesCompartides.getMissatge());
				
				if(farewellMessage) {
					textArea.setText(textArea.getText() + "\n[SERVIDOR] En " + this.nomClientActual + " se n'ha anat");
					this.dadesCompartides.setSocketTancarConnexio(this.clientSocket);
				}
				this.enviarDades.release();
			}	
		} catch (IOException ex) {
		}
	}

	public static boolean isFarewellMessage(String clientMessage) {
		return (clientMessage.equals(TcpServer.paraulaTancarConnexio) ? true : false);
	}
}
