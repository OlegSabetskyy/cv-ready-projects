import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.Semaphore;

import javax.net.ssl.SSLSocket;

import javafx.scene.control.TextArea;

public class TcpClientThreadRebre extends Thread {
	private Semaphore acabarConnexio;
	private SSLSocket clientSocket;
	private Semaphore comencarRebreDades;
	private TextArea textArea;
	
	public TcpClientThreadRebre(SSLSocket clientSocket, Semaphore acabarConnexio, Semaphore comencarRebreDades, TextArea textArea) {
		this.clientSocket = clientSocket;
		this.acabarConnexio = acabarConnexio;
		this.comencarRebreDades = comencarRebreDades;
		this.textArea = textArea;
	}

	@Override
	public void run() {
		try {
			comencarRebreDades.acquire();
				rebreDades();
		} catch (InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}

	//S'encarrega de rebre les dades que envia el servidor
	private void rebreDades() {
		BufferedReader in = null;

		try {
			in = new BufferedReader(new InputStreamReader(this.clientSocket.getInputStream()));
		} catch (IOException e) {
			e.printStackTrace();
		}

		//acabarConexio l'utilitzo per asaber si acabar o no la connexio, amb l'available permits puc conitnuar amb l'execucio sense tindre que parar
		//com si pasaria amb el .acquire
		while (acabarConnexio.availablePermits() == 0) {
			try {
				String missatgeRebut = in.readLine();
				textArea.setText(textArea.getText() + "\n " + missatgeRebut);
				if(missatgeRebut.equals("[SERVIDOR]\tEstic tancant . . .")) {
					acabarConnexio.release();
				}
			} catch (Exception e) {
				System.out.println("Excepció: " + e);
			}
		}

	}
}