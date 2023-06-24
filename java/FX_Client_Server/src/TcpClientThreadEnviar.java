import java.io.IOException;
import java.io.PrintStream;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.net.ssl.SSLSocket;

import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class TcpClientThreadEnviar extends Thread {
	private Semaphore acabarConnexio;
	private SSLSocket clientSocket;
	private Semaphore comencarRebreDades;
	private TextArea textArea;
	private TextField textField;
	private Semaphore botoPremut;
	private Semaphore desconectar;
	
	public TcpClientThreadEnviar(SSLSocket clientSocket, Semaphore acabarConnexio, Semaphore comencarRebreDades, TextArea textArea, TextField textField, Semaphore botoPremut, Semaphore desconectar) {
		this.clientSocket = clientSocket;
		this.acabarConnexio = acabarConnexio;
		this.comencarRebreDades = comencarRebreDades;
		this.textArea = textArea;
		this.textField = textField;
		this.botoPremut = botoPremut;
		this.desconectar = desconectar;
	}

	@Override
	public void run() {
		preguntarNomUsuari();
		enviarDades();
		tancarConnexio();
		//Tanco el programa, ja que així no surten excepcions i queda millor
		System.exit(0);
	}
	
	//Espera fins que l'usuari entra el nom d'usuari
	private void preguntarNomUsuari() {
		try {
			PrintStream out = new PrintStream(this.clientSocket.getOutputStream());
			textArea.setText(textArea.getText() + "\n [MISSATGE DEL SERVIDOR] Nom d'usuari (fins que no el fiquis no rebras missatges)");
			botoPremut.acquire();
				out.println(textField.getText());
				out.flush();
				comencarRebreDades.release();
				textField.setText("");
		} catch (Exception e) {
			System.out.println("Excepció clientThread:  "+ e);
		}
	}

	//Part de codi que s'encarrega d'enviar les dades que escriu el client al servidor (que no sigui el nom d'usuari)
	private void enviarDades() {
		String request = "";
		boolean continueConnected = true;
		PrintStream out = null;
		
		try {
			out = new PrintStream(this.clientSocket.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}

		while (continueConnected) {
			try {
				botoPremut.acquire();
					request = (desconectar.availablePermits() == 0) ? textField.getText() : TcpServer.paraulaTancarConnexio;
					out.println(request);
					out.flush();
					continueConnected = mustFinish(request);
					textField.setText("");
			} catch (Exception e) {
				System.out.println("Excepció clientThread:  "+ e);
			}
		}
	}

	private void tancarConnexio() {
		try {
			this.clientSocket.close();
		} catch (IOException ex) {
			Logger.getLogger(TcpClient.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	private boolean mustFinish(String request) {
		boolean retornar = true;
		if (request.equals(TcpServer.paraulaTancarConnexio)) {
			retornar = false;
			this.acabarConnexio.release();
		}
		
		return retornar;
	}
}
